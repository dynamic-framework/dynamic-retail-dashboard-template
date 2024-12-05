import type { ApiMetadata } from '../api-interface';
import type { Metadata } from '../interface';

export default function metadataMapper(apiTerm: ApiMetadata): Metadata {
  return {
    page: apiTerm.page,
    rows: apiTerm.rows,
    totalPages: apiTerm.total_pages,
    totalRows: apiTerm.total_rows,
  };
}
