"use client";
import React, { forwardRef } from "react";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export const TaskTitleInput = forwardRef<HTMLInputElement, Props>(({ value, onChange }, ref) => {
    return (
        <input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="عنوان کار"
            className="w-full p-2 border rounded"
        />
    );
});

TaskTitleInput.displayName = "TaskTitleInput";