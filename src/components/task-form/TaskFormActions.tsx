"use client";
import React from "react";

type Props = {
    isPending: boolean;
    isEdit: boolean;
    onCancel?: () => void;
};

export const TaskFormActions: React.FC<Props> = ({
    isPending,
    isEdit,
    onCancel,
}) => (
    <div className="flex gap-2">
        <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
        >
            {isPending ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "افزودن"}
        </button>
        {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
                انصراف
            </button>
        )}
    </div>
);