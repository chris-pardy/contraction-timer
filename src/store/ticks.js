import { writable, get } from 'svelte/store';
import { detach_before_dev } from 'svelte/internal';

export const ticks = writable([]);
