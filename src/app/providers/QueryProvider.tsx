'use client'

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type QueryProviderTypes = {
	children: React.ReactNode
}

const QueryProvider = ({children}: QueryProviderTypes) => {
	const [queryClient] = React.useState<QueryClient>(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;