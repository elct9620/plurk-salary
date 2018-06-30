import React from 'react';

export const SalaryCtx = React.createContext([]);
export const SalaryUpdatedAtCtx = React.createContext((new Date()).getTime());
export const SalaryLoadProgressCtx = React.createContext(0);
