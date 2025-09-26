"use client";

import React from "react";

type Props = {
    isPending: boolean;
    isEdit: boolean;
    onCancel?: () => void;
};

export const TaskFormActions: React.FC<Props> = ({ isPending, isEdit, onCancel }) => (
    <div className="ml-auto flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            {isPending ? "در حال ذخیره..." : isEdit ? "ذخیره" : "افزودن"}
        </button>
        {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                className="px-3 py-2 rounded border"
            >
                انصراف
            </button>
        )}
    </div>
);