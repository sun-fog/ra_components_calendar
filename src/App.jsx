import Calendar from './components/Calendar/Calendar.jsx'

const now = new Date(2017, 11, 8)

export default function App() {
  return <Calendar date={now} />
}
