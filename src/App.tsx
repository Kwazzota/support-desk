import './App.css';
import TicketList from "./features/tickets/TicketList.tsx";
import {tickets} from "./features/tickets/fixtures.ts";
import type { TicketStatus} from "./features/tickets/types.ts";
import { useState} from "react";

type TicketFilter = TicketStatus | "all"

function App() {
  const [filter, setFilter] = useState<TicketFilter>('all');

  const visibleTickets = filter === 'all'
    ? tickets
    : tickets.filter(ticket => ticket.status === filter)

  return (
      <main>
        <header>
          <h1>Support Desk</h1>
          <p>Система управления заявками команды поддержки</p>
        </header>
        <section>
          <h2>Заявки</h2>
            <span className="filter">
                <button className="filter-button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Все</button>
                <button className="filter-button" aria-pressed={filter === 'new'} onClick={() => setFilter('new')}>Новые</button>
                <button className="filter-button" aria-pressed={filter === 'in_progress'} onClick={() => setFilter('in_progress')}>В работе</button>
                <button className="filter-button" aria-pressed={filter === 'closed'} onClick={() => setFilter('closed')}>Закрытые</button>
            </span>
            <TicketList ticket={visibleTickets} />
            <p>Показано {visibleTickets.length} из {tickets.length}</p>
        </section>
      </main>
  )
}

export default App