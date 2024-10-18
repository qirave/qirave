'use client';
import React, { Suspense, useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSuspenseQuery } from '@apollo/client';
import { TaxData } from '@/lib/types/data';
import TaxQuery from '@/database/queries/taxes.gql';
import { TaxOn } from '@/lib/data/tax';

type TaxSelectProps = {
  on: TaxOn;
  onTaxIDChange: (id: number) => void;
};

export default function TaxSelect({
  on = ['sales', 'purchase'],
  onTaxIDChange
}: TaxSelectProps) {
  const { data: taxData, error } = useSuspenseQuery<TaxData>(TaxQuery);
  const [tsxID, setTaxID] = useState<number | null>(null);

  const TaxesSelect = useMemo(() => {
    return taxData.taxes.filter((tax) =>
      [...tax.on].some((taxOn) => on.includes(taxOn as TaxOn & string))
    );
  }, [taxData, on]);

  const taxIDHandler = (value: string) => {
    setTaxID(parseInt(value));
    onTaxIDChange(parseInt(value));
  };

  return (
    <Select value={tsxID?.toString()} onValueChange={taxIDHandler}>
      <SelectTrigger id="tax" aria-label="Tax">
        <SelectValue placeholder="Select Tax" />
      </SelectTrigger>
      {error ? (
        <SelectContent>{error.message}</SelectContent>
      ) : (
        <Suspense fallback={<SelectContent>Loading...</SelectContent>}>
          <SelectContent>
            {TaxesSelect.map((tax) => (
              <SelectItem
                key={tax.id}
                value={tax.id.toString()}
                className="flex px-0 py-1 items-center justify-center"
              >
                <Badge
                  variant="outline"
                  className={`w-full px-4 py-1 ${tax.on.includes('sales') ? 'bg-stone-200' : 'bg-teal-200'}`}
                >
                  {tax.name}{' '}
                  {tax.type === 'percentage' ? `${tax.rate}%` : `${tax.rate}`}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Suspense>
      )}
    </Select>
  );
}
