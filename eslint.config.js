import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
export default [
	{ ignores: ['build/**', '.svelte-kit/**', 'node_modules/**', 'static/**'] },
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			]
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: { parserOptions: { parser: ts.parser, svelteConfig } },
		rules: {
			// Site is deliberately deployed at the domain root (no kit.paths.base).
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
];
