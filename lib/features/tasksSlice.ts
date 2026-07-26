import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TicketData } from '../types';

interface TicketsState {
  tickets: TicketData[];
  isPending: boolean;
  statuses: ('todo' | 'in_progress' | 'qa' | 'done')[];
  activeStatus: TicketData['status'] | undefined
}

const initialState: TicketsState = {
  tickets: [],
  isPending: false,
  statuses: [],
  activeStatus: undefined
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initState: (
      state,
      action: PayloadAction<{
        tickets: TicketData[];
        statuses: ('todo' | 'in_progress' | 'qa' | 'done')[];
        activeStatus: TicketData['status']| undefined
      }>,
    ) => {
      state.tickets = action.payload.tickets;
      state.statuses = action.payload.statuses;
      state.activeStatus = action.payload.activeStatus
    },
    updateTicketStatus: (
      state,
      action: PayloadAction<{
        ticketId: TicketData['id'];
        status: TicketData['status'];
      }>,
    ) => {
      const { ticketId, status } = action.payload;
      state.tickets = state.tickets.map(el =>
        el.id === ticketId ? { ...el, status } : el,
      ).filter(ticket => state.activeStatus ? ticket.status === state.activeStatus : true);
    },
    startPending: state => {
      state.isPending = true;
    },
    stopPending: state => {
      state.isPending = false;
    },
  },
});

export const { initState, updateTicketStatus, startPending, stopPending } =
  tasksSlice.actions;

export default tasksSlice.reducer;
