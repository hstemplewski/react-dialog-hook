import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DialogConsumer, DialogProvider } from "../use-dialog.context";

describe("Dialog context", () => {
  it("throw error without provider", () => {
    expect(() => render(<DialogConsumer>{() => <div></div>}</DialogConsumer>)).toThrowError(
      "DialogConsumer must be used within a DialogProvider."
    );
  });

  it("assign default value", () => {
    render(
      <DialogProvider>
        <DialogConsumer<null, null>>
          {({ isOpen, params, results }) => (
            <div>
              <span>
                Dialog state: <pre>{isOpen.toString()}</pre>
              </span>
              <span>
                Dialog params: <pre>{JSON.stringify(params)}</pre>
              </span>
              <span>
                Dialog results: <pre>{JSON.stringify(results)}</pre>
              </span>
            </div>
          )}
        </DialogConsumer>
      </DialogProvider>
    );

    expect(screen.getByText(/^Dialog state:/)).toHaveTextContent("Dialog state: false");
    expect(screen.getByText(/^Dialog params:/)).toHaveTextContent("Dialog params: null");
    expect(screen.getByText(/^Dialog results:/)).toHaveTextContent("Dialog results: null");
  });
});
