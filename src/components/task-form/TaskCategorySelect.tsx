"use client";

import React from "react";
import type { Category } from "@/lib/types";

const categories: Category[] = ["Personal", "Work", "Other"];

type Props = {
    value: Category;
    onChange: (c: Category) => void;
};

export const TaskCategorySelect: React.FC<Props> = ({ value, onChange }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value as Category)}
        className="p-2 border rounded"
    >
        {categories.map((c) => (
            <option key={c} value={c}>
                {c}
            </option>
        ))}
    </select>
);