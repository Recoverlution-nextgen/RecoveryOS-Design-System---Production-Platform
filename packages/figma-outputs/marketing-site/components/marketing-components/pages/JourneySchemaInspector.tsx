/**
 * Journey Schema Inspector
 * Quick utility to see what's actually in journey_weeks table
 */

import { useState, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';
import { ArrowLeft, Database, Loader2 } from 'lucide-react';

// Initialize Supabase client once
const supabase = createClient();

export default function JourneySchemaInspector({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch tables from the database
      const { data: tablesData, error: tablesError } = await supabase
        .rpc('get_tables');

      if (tablesError) {
        console.error('Tables error:', tablesError);
        setError(tablesError.message);
      } else {
        setTables(tablesData || []);
      }
    } catch (err: any) {
      console.error('Error loading tables:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTableData = async (tableName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch data from the selected table
      const { data: tableData, error: tableError } = await supabase
        .from(tableName)
        .select('*');

      if (tableError) {
        console.error('Table data error:', tableError);
        setError(tableError.message);
      } else {
        setTableData(tableData || []);
        setColumns(Object.keys(tableData[0] || {}));
      }
    } catch (err: any) {
      console.error('Error loading table data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#5739FB] animate-spin" />
          <p className="text-white/60">Loading journey schema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('command-center')}
                className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-[#5739FB]" />
              <h1 className="text-white">Journey Schema Inspector</h1>
            </div>
          </div>
          <button
            onClick={loadTables}
            className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400">
            Error: {error}
          </div>
        )}

        {/* Table Selection */}
        <div className="mb-8">
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-white text-xl mb-4">Select a Table</h2>
            <select
              className="w-full p-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white"
              value={selectedTable || ''}
              onChange={(e) => {
                setSelectedTable(e.target.value);
                loadTableData(e.target.value);
              }}
            >
              <option value="">-- Select a Table --</option>
              {tables.map((table) => (
                <option key={table.table_name} value={table.table_name}>
                  {table.table_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Data */}
        {selectedTable && (
          <div className="mb-8">
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-white text-xl mb-4">
                {selectedTable} Table ({tableData.length} rows)
              </h2>
              {tableData.length === 0 ? (
                <p className="text-white/40">No data found or table does not exist</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-white/80 text-sm">
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th key={column} className="px-4 py-2">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          {columns.map((column) => (
                            <td key={column} className="px-4 py-2">
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}