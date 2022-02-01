import React, { createContext, ReactElement } from "react";

import { useDialog, UseDialogInterface } from "./use-dialog";

export const DialogContext = createContext<UseDialogInterface | undefined>(undefined);

export const DialogProvider: React.FC = ({ children }) => {
  const value = useDialog();

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

interface DialogConsumerProps<Params = unknown, Results = unknown> {
  children: (context: UseDialogInterface<Params, Results>) => ReactElement;
}

export function DialogConsumer<Params = unknown, Results = unknown>({
  children,
}: DialogConsumerProps<Params, Results>) {
  return (
    <DialogContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("DialogConsumer must be used within a DialogProvider.");
        }
        return children(context as UseDialogInterface<Params, Results>);
      }}
    </DialogContext.Consumer>
  );
}
