import './Calendar.css'

const WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
const WEEK_DAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS_NOMINATIVE = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export default function Calendar({ date }) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7

  const lastDate = new Date(year, month + 1, 0).getDate()
  const endOffset = (7 - ((startOffset + lastDate) % 7)) % 7

  const cells = []
  for (let i = startOffset; i > 0; i--) {
    const d = new Date(year, month, 1 - i)
    cells.push({ day: d.getDate(), otherMonth: true })
  }
  for (let d = 1; d <= lastDate; d++) {
    cells.push({ day: d, otherMonth: false })
  }
  for (let i = 1; i <= endOffset; i++) {
    cells.push({ day: i, otherMonth: true })
  }

  const rows = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  const materialDay = WEEK_DAYS[(date.getDay() + 6) % 7]

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{materialDay}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">{MONTHS_GENITIVE[month]}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{MONTHS_NOMINATIVE[month]}</span>
          &nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {WEEK_DAYS_SHORT.map((day, i) => (
              <th scope="col" key={day} title={WEEK_DAYS[i]}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, i) => (
            <tr key={i}>
              {week.map((cell, j) => (
                <td
                  key={j}
                  className={[
                    cell.otherMonth ? 'ui-datepicker-other-month' : '',
                    !cell.otherMonth &&
                    cell.day === date.getDate()
                      ? 'ui-datepicker-today'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {cell.day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
