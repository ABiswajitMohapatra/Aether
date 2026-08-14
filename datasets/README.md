# Datasets

Built-in tables are generated in `src/lib/ml/datasets.ts` and seeded into PostgreSQL on first API call:

- `california-housing`
- `diabetes`
- `wine-quality`
- `iris`
- `income`

Upload additional CSVs from the dashboard. Keep files at or below 5,000 rows. The last numeric/categorical column is usually the target, but you can pick any header.
