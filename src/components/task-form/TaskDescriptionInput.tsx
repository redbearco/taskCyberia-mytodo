"use client";

import React from "react";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export const TaskDescriptionInput: React.FC<Props> = ({ value, onChange }) => (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="توضیحات (اختیاری)"
        className="w-full p-2 border rounded h-20"
    />
);