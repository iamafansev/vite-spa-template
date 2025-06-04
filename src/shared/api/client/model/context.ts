import { createContext } from 'react';

import { ApiClients } from './types';

export const ApiClientContext = createContext<ApiClients | null>(null);
