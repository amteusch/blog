---
templateKey: blog-post
title: How to create a scalable and maintainable front-end architecture
pinned: true
draft: false
date: 2019-11-11T00:00:00.000Z
featuredImage: architecture-detailed.png
description: >-
  Modern front-end frameworks and libraries make it easy to create reusable UI components. But, in many projects over the years I have found that making reusable components is often not enough. We need a scalable front-end architecture.
tags:
  - architecture
  - frontend
---

_**November 2019**: the original article from August 2019 is updated to highlight its link with MVC/MVVM. Also, the parts around the core layer have been redone._

Modern front-end frameworks and libraries make it easy to create [reusable UI components](/blog/interfacing-your-ui-components/). This is a step in a good direction to create maintainable front-end applications. Yet, in many projects over the years I have found that making reusable components is often not enough. My projects became unmaintainable, as requirements changed or new requirements came up. It took longer and longer to find the correct file or debug something across many files.

Change needed to happen. I can improve my search skills, or be more proficient in using Visual Studio Code. But, I often not the only one working on the front-end. So, we need to the setup of our front-end projects. We need to make them maintainable and scalable. This means that we can apply changes in the current features, but also add new features quicker.

## Finding a scalable architecture

In traditional development, we have many [architectural patterns](https://en.wikipedia.org/wiki/Software_design_pattern) we can follow. Two of them that are still popular are [domain-driven development (DDD)](https://martinfowler.com/bliki/BoundedContext.html) and [separation of concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns). In front-end development, they too can be of great value. With DDD you try to groups of similar features and decouple them as much as possible from other groups (e.g. modules). While with SoC we, for instance, separate logic, views, and data-models (e.g. using the MVC or MVVM design pattern).

We expect modern front-end applications to do more and more of the heavy lifting. With this added complexity, bugs are becoming more frequent. We need a reliable architecture, that is both maintainable and scalable. My goal was, and still is, to find such a front-end architecture which is framework-agnostic. The architecture should provide a developer or a team to build a scalable front-end. By adopting the architecture (e.g. remove parts), you can adapt it to small and big projects.

![High-level scalable front-end architecture](/img/architecture-high-level.png 'High-level scalable front-end architecture')

## Filling in the details

Our goal as front-end developers is to provide value to our users by letting them interact with our work. When they do, the application routing will guide the user to the correct module. Each module can is a separate domain. Business logic shapes these domains. Various modules use this logic, such as retrieving data from a back-end service. This logic is thus placed in the application layer. This is the core setup of a scalable front-end architecture.

When looking at a project structure, we can follow something like shown below. All code for the core layer is in the `app` directory. While all modules have a directory in the `modules` directory. Reusable UI components (e.g. tables) that do not rely on business logic are in the `components` directory.

```
src/
├── assets/
├── components/
├── core/
├── lib/
├── modules/
└── styles/
```

The remaining directories hold our static `assets` (e.g. images) or helper functions in `lib`. These can differ from simple utility functions to complex auto-layout logic for graphs, or even hold generic React Hooks. Finally, we have a `styles` directory. Many prefer something like `CSS-in-JS` or [styled-components](https://www.styled-components.com/). I prefer a solid CSS architecture, such as [Harry Roberts' ITCSS](https://csswizardry.com/2018/11/itcss-and-skillshare/), that follows the SoC mindset of the architecture.

The above does not look like something special. This is a standard modular approach for development. But, by zooming in on a module and the core layer, the architecture shines. Below I zoomed in on the core layer and a single module. In the rest of this blog post, I discuss each of the different topics and the ideas behind them. The dotted connections are optional connections that you can use when you want a less complex architecture. In this case, the pub/sub and workers are removed from the architecture and controllers directly talk o the stores and API clients.

![Detailed architecture of a module](/img/architecture-detailed.png 'Detailed architecture of a module')

## The application backbone

The core layer is the backbone of the architecture. The goal of this part of the application is to be scalable and framework-agnostic. There are a few main parts in this layer: API clients, a pub/sub and one or more stores. You can have some [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) running on this level as well. Stores come in many sizes. At first glance, you might think about the application state. And you are right, that is one store. But what about your user's history stack? This is, in fact, another example of a store.

When you look at stores in this light, you find many of them. Application state, navigation history, session management, API caches and logger history. These should live on an application level. This also means that they should be configured here. You can, for instance, download the [history package on npm](https://www.npmjs.com/package/history) and use this for navigation history. In the store, you can expand the package by adding your functions (e.g. a different `push`). You can now also expose these to the rest of your application.

On the other side, we have one or more API clients. Some of our projects have a dedicated back-end service to talk to. Be it an API gateway on top of a [Kubernetes](https://kubernetes.io/) cluster with many micro-services, or a single monolith back-end. But sometimes we need to connect to different external services. Each of these services requires configuration (e.g. authentication). All these configurations and invoked clients live in the core layer. This way they can be used by all modules.

![Using the pub/sub as the linking pin between controllers and API clients](/img/architecture-pubsub.png 'Using the pub/sub as the linking pin between controllers and API clients')

The different stores and API clients can become a consistency problem. Try to combine GraphQL requests and REST requests to show the correct data. By using a pub/sub we can generalize how controllers interact with all the different parts on this level. They publish request events and subscribe to response events. This reassembles how many modern state management libraries work. Another upside of this approach is that you can change a client API, without the modules ever knowing.

This all sounds like overkill for smaller applications, and it often can be. You can reduce the complexity in this architecture though. When you only have a single API client, you can remove the pub/sub. In such a case, you can 'talk' to the API client and the different stores.

A corresponding project structure for the `app` directory can be something like:

```
.
└── core/
    ├── apis/
    ├── config/
    ├── controllers/
    ├── events/
    ├── lib/
    ├── models/
    ├── stores/
    ├── workers/
    └── index.js
```

Most directories within the `app` folder should be self-explanatory by now. The `controllers` and `models` directories share the same purpose as those inside a module. The `lib` directory holds all helper functions (e.g. a `createPubSub` function). Last, we can have scheduled events (e.g. an auto sign out event) stored in the `events` directory.

## modules, modules & more modules

What defines a module and how is it separate from complex UI components? The key-word here is _business logic_. Take everything around uploading a file. You could combine generic components like a drag-and-drop zone. But, the actual uploading is different for each application, guided by technological choices. By combining the UI component and the actual action to upload a file, we create a small contained module. The moment we combine components with business logic, we convert them into modules.

The detailed architecture diagram already shows the internals of a module. The structure of a module is inspired by the ideas of MVC and MVVM. Most times, the application routing points towards a specific module. The routing of the module itself determines which page it loads, i.e. a single page is linked to a single route. A page is what a user sees and comprises out of UI components and controllers.

Controllers are an umbrella term for actions and interfaces. Out users trigger actions when they interact with our applications. Interfaces listen to changes in states, be it in the module or somewhere else in the application. In most cases they are (partly) separated from the UI components. But they can also live in your component. If they are not required in other components, why separate them? React Context with a reducer function is a great example of a combined component. It all depends on the complexity of the problem you try to solve.

```
.
└── modules/
    └── users/
        ├── components/
        ├── config/
        │   ├── constants.js
        │   ├── routes.js
        │   ├── tables.js
        │   └── forms.js
        ├── controllers/
        ├── models/
        ├── pages/
        ├── queries/
        ├── state/
        └── index.js
```

Controllers are most times (small) actions, and so can come in different formats. They can be plain JavaScript functions (e.g. utility functions), or React Hooks. But we can separate them from the components in the `controllers` directory.

Like the core layer, a module can have its own state management and static definitions, i.e. constants. In that case, we put that code in the `state`, `config` and `models` directories (or files). Depending on our API clients, we want to define and group queries (e.g. GraphQL). These should be in the `queries` directory.

## Sharing between modules

Never have I seen an application in which we could decouple modules completely. It is inevitable that you have to share models, controllers and components between modules. But how can modules interact with each other?

The `index.js` file of a module describes which components, controllers, and models are accessible for other components. So we could use a file drop-zone or the upload controller from the files module. But, sometimes we have to choose what we are exposing to other modules. Will it be a controller, or are we combine the controller into a component?

Let's look at the example of a user drop-down. We can create an action that provides us all the users we can select from different modules. But, we now need to create a specific drop-down in all other modules. This might not need much effort to have a generic drop-down component. But this component might not work in a form. It might be worth the investment to create one `UserDropdown` component that we can use. When something changes around users, we now change only one component. So sometimes we need to choose what to expose: controllers or components.

## UI component anatomy

One last detail level is missing still, and that is the architecture of a UI component. In a [previous](/blog/interfacing-your-ui-components/) blog post I described this already. When you look at this anatomy, you will see some concepts back that we apply on a bigger scale.

![The UI component anatomy](/img/architecture-component.png 'The UI component anatomy')

The front-end is the first point of entry for our users. With our front-end projects growing in features, we will also introduce more bugs. But our users expect no bugs, and new features fast. This is impossible. Yet, by using good architecture we can only try to achieve this as much as possible.

## Conclusion

In front-end development, we often adjust our project to the framework we use. Although we live inside an ecosystem when we do so, it often is not scalable towards the future. By looking at existing concepts we can adjust our view on front-end problems. By seeing front-end concepts for what they are, we can create a scalable architecture that works for small or big, many or few.