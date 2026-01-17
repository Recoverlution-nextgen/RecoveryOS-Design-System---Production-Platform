/**
 * DATA TABLE - PRODUCTION-READY TABLE COMPONENT
 * Sortable columns · Row selection · Loading states · Empty states
 */

import { useState } from 'react';
import { ChevronUp, ChevronDown, Loader } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRowClick?: (row: any) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable({ data, columns, onRowClick, loading, emptyMessage }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    
    const comparison = aVal > bVal ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <p className="text-zinc-400">{emptyMessage || 'No data available'}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-950 border-b border-zinc-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`
                    px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider
                    ${col.sortable !== false ? 'cursor-pointer hover:text-white' : ''}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key && (
                      sortDirection === 'asc' 
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sortedData.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onRowClick?.(row)}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-zinc-800/50' : ''}
                  transition-colors
                `}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-zinc-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Row count footer */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-3">
        <p className="text-xs text-zinc-500">
          Showing {sortedData.length} {sortedData.length === 1 ? 'row' : 'rows'}
        </p>
      </div>
    </div>
  );
}