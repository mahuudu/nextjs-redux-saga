
import * as React from "react";

export interface IEmptylayoutProps {}

export function Emptylayout({ children }: any) {
  return (
    <div className="Main">
            {children}
    </div>
  );
}
