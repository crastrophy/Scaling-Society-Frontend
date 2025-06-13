export function StatSeriousYes({ value, change }: { value: string | number; change?: string }) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-white">Serious-Yes Rate</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        {change && (
          <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
            {change}
          </span>
        )}
      </div>
    );
  } 