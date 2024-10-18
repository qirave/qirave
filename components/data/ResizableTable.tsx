"use client";
import React, { useRef, useState } from "react";
import {
    useReactTable,
    ColumnResizeMode,
    getCoreRowModel,  
    ColumnDef,
    flexRender,
    ColumnResizeDirection,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    RowSelectionState,
    OnChangeFn,
    Row,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";


export default function ResizableTable<T extends { id: string | number }>({ 
    columns,
    data,
    resizeMode='onChange',
    resizeDirection='ltr',
    onSorting = undefined,
    onColumnFilter = undefined,
    onColumnVisibility = undefined,
    onRowSelection = undefined,

    //
    rowAction = undefined,

    tableProps = {},
    tableHeaderProps = {},
    tableHeadProps = {},
    tableBodyProps = {},
    tableRowProps = {},
    tableCellProps = {},
}: { 
    columns: ColumnDef<T>[];
    data: T[];
    resizeMode?: ColumnResizeMode;
    resizeDirection?: ColumnResizeDirection;
    onSorting?: [SortingState, OnChangeFn<SortingState>] | undefined;
    onColumnFilter?: [ColumnFiltersState, OnChangeFn<ColumnFiltersState>] | undefined;
    onColumnVisibility?: [VisibilityState, OnChangeFn<VisibilityState>] | undefined;
    onRowSelection?: [RowSelectionState, OnChangeFn<RowSelectionState>] | undefined;

    //
    rowAction?: (row: T) => void;

    tableProps?: React.HTMLAttributes<HTMLTableElement>;
    tableHeaderProps?: React.HTMLAttributes<HTMLTableSectionElement>;
    tableHeadProps?: React.HTMLAttributes<HTMLTableCellElement>;
    tableBodyProps?: React.HTMLAttributes<HTMLTableSectionElement>;
    tableRowProps?: React.HTMLAttributes<HTMLTableRowElement>;
    tableCellProps?: React.HTMLAttributes<HTMLTableCellElement>;
}) {

    const tableRef = useRef<HTMLTableElement>(null);
    const [isSelectingText, setIsSelectingText] = useState(false);
    const mouseDownTimeRef = useRef(0);

    const table = useReactTable({
        data,
        columns: columns,
        columnResizeMode: resizeMode,
        columnResizeDirection: resizeDirection,
        getRowId: originalRow => new String(originalRow.id).toString(),
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: onRowSelection ? onRowSelection[1] : undefined,
        onSortingChange: onSorting ? onSorting[1] : undefined,
        onColumnFiltersChange: onColumnFilter ? onColumnFilter[1] : undefined,
        onColumnVisibilityChange: onColumnVisibility ? onColumnVisibility[1] : undefined,

        state: {
            rowSelection: onRowSelection ? onRowSelection[0] : undefined,
            sorting: onSorting ? onSorting[0] : undefined,
            columnFilters: onColumnFilter ? onColumnFilter[0] : undefined,
            columnVisibility: onColumnVisibility ? onColumnVisibility[0] : undefined,
        },

        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })


    const handleMouseDown = () => {
        setIsSelectingText(false);
        mouseDownTimeRef.current = new Date().getTime();
    };

    const handleMouseUp = (row: Row<T>) => {
        const timeDiff = new Date().getTime() - mouseDownTimeRef.current;
        if (window.getSelection()?.toString()) {
            setIsSelectingText(true);
        } else if (timeDiff < 200 && !isSelectingText) {
            if (!rowAction) return;
            rowAction(row.original); // Fire the action for row click
        }
    };




    // const tableContainerWidth =  (tableRef.current?.parentElement?.clientWidth ?? 0 < table.getCenterTotalSize()) ? '100%' : Math.min(table.getCenterTotalSize(), tableRef.current?.parentElement?.clientWidth ?? 0)


	return (
        <Table ref={tableRef} {...tableProps} className={`w-full border-collapse`}>
			<TableHeader {...tableHeaderProps}>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id} {...tableRowProps}>
						{headerGroup.headers.map((column) => (
							<TableHead key={column.id} {...tableHeadProps} onDoubleClick={() => column.column.resetSize()} colSpan={column.colSpan} style={{width: column.getSize()}} className="relative group [&:has([role=checkbox])]:pl-0">
                                { column.isPlaceholder ? null : flexRender(
                                    column.column.columnDef.header,
                                    column.getContext(),
                                )}
                                <div
                                    onMouseDown={column.getResizeHandler()}
                                    onTouchStart={column.getResizeHandler()}
                                    className={`hidden group-[:hover]:block absolute top-0 h-full w-1 rounded-lg opacity-25 cursor-col-resize select-none transition-transform duration-200 ease-in-out
                                        ${table.options.columnResizeDirection === 'ltr' ? 'right-0' : 'left-0'} 
                                        ${column.column.getIsResizing() ? 'bg-primary opacity-45' : 'bg-muted-foreground opacity-25'} 
                                        ${resizeMode === 'onEnd' && column.column.getIsResizing() ? `translate-x-[${(table.options.columnResizeDirection === 'ltr' ? 1 : -1) * (table.getState().columnSizingInfo.deltaOffset ?? 0)}px]` : ''}
                                    `}
                                />
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>

			<TableBody {...tableBodyProps}>
				{table.getRowModel().rows.map(row => (
                    <TableRow 
                        key={row.id} {...tableRowProps} 
                        className="group cursor-pointer"
                    >
                        {row.getVisibleCells().map(cell => (
                            <TableCell 
                                key={cell.column.id} {...tableCellProps} 
                                style={{ width: cell.column.getSize() }}
                                onMouseDown={() => !['select', 'checkbox'].includes(cell.column.id) && handleMouseDown()}
                                onMouseUp={() => !['select', 'checkbox'].includes(cell.column.id) && handleMouseUp(row)}
                                className="[&:has([role=checkbox])]:pl-0"
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
				))}
			</TableBody>
		</Table>
	);
}
