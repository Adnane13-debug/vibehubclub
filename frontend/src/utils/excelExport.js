import { utils, write, SSF } from 'xlsx'

/**
 * Trigger a browser download for a workbook (more reliable than writeFile after async API calls).
 */
export function downloadWorkbook(workbook, filename) {
  const buffer = write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function jsonToSheet(rows) {
  return utils.json_to_sheet(rows)
}

export function newWorkbook() {
  return utils.book_new()
}

export function appendSheet(workbook, sheet, name) {
  utils.book_append_sheet(workbook, sheet, name)
}

/**
 * Normalize Excel / locale date cells to MySQL-friendly YYYY-MM-DD.
 */
export function parseExcelDate(value) {
  if (value == null || value === '') return ''

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  if (typeof value === 'number' && value > 0) {
    const parsed = SSF.parse_date_code(value)
    if (parsed) {
      const month = String(parsed.m).padStart(2, '0')
      const day = String(parsed.d).padStart(2, '0')
      return `${parsed.y}-${month}-${day}`
    }
  }

  const text = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const fr = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (fr) {
    const day = fr[1].padStart(2, '0')
    const month = fr[2].padStart(2, '0')
    return `${fr[3]}-${month}-${day}`
  }

  const parsed = new Date(text)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }

  return text
}

export function mapSheetRowToEvent(row) {
  const rawId = row.ID ?? row.id ?? row.Id ?? ''
  const parsedId = rawId === '' || rawId == null ? null : Number(rawId)
  const id = parsedId != null && !Number.isNaN(parsedId) && parsedId > 0 ? parsedId : null

  const titre =
    row.Name ??
    row.Title ??
    row.titre ??
    row.Titre ??
    ''

  const dateSource =
    row['Start Date'] ??
    row.date_debut ??
    row.Date ??
    ''

  const endSource =
    row['End Date'] ??
    row.date_fin ??
    dateSource

  return {
    id,
    titre: String(titre).trim(),
    categorie: String(row.Category ?? row.categorie ?? 'culture').trim() || 'culture',
    lieu: String(row.Location ?? row.lieu ?? '').trim(),
    date_debut: parseExcelDate(dateSource),
    date_fin: parseExcelDate(endSource),
    description: String(row.Description ?? row.description ?? '').trim(),
  }
}
