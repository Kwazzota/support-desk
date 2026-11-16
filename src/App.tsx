import './App.css'
import TicketList from "./features/tickets/TicketList.tsx";
import {tickets} from "./features/tickets/fixtures.ts";

function App() {
  return (
      <main>
        <header>
          <h1>Support Desk</h1>
          <p>Система управления заявками команды поддержки</p>
        </header>
        <section>
          <h2>Заявки</h2>
          <TicketList ticket={tickets} />
        </section>
      </main>
  )
}

export default App