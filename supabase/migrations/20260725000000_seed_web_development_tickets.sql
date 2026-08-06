do $$
begin
  -- A fresh local reset has no users until seed.sql runs. The linked remote
  -- project already has this profile, so the migration inserts the tickets.
  if exists (
    select 1
    from public.profiles
    where id = 'b3faa131-d6f7-41e2-951d-63f88a90faa8'
  ) then
    with ticket_seed (title, description, due_offset) as (
      values
        (
          'Add password reset flow',
          'Let users request a password-reset email and securely choose a new password from the recovery link.',
          3
        ),
        (
          'Improve dashboard mobile navigation',
          'Replace the desktop navigation with an accessible collapsible menu on tablet and mobile viewports.',
          4
        ),
        (
          'Add ticket filtering by status',
          'Allow users to filter the dashboard board by one or more ticket statuses without reloading the page.',
          5
        ),
        (
          'Show loading states during ticket updates',
          'Display clear pending feedback and prevent duplicate submissions while ticket changes are being saved.',
          6
        ),
        (
          'Validate ticket forms on the client and server',
          'Apply consistent title, description, assignee, and due-date validation with helpful field-level errors.',
          7
        ),
        (
          'Add pagination to the ticket list API',
          'Return tickets in stable pages and expose the metadata required to load additional results.',
          8
        ),
        (
          'Improve empty states across the dashboard',
          'Add useful empty-state messages and actions when searches, filters, or ticket columns have no results.',
          9
        ),
        (
          'Add optimistic ticket status updates',
          'Move tickets immediately after drag-and-drop and restore the previous state if the server update fails.',
          10
        ),
        (
          'Audit dashboard keyboard accessibility',
          'Ensure navigation, dialogs, forms, and board controls are usable without a mouse and have visible focus states.',
          11
        ),
        (
          'Optimize dashboard data queries',
          'Remove unnecessary requests and reduce the amount of ticket and profile data loaded during the initial render.',
          12
        ),
        (
          'Add confirmation before deleting a ticket',
          'Require explicit confirmation that includes the ticket title before permanently deleting it.',
          13
        ),
        (
          'Create reusable error alert component',
          'Standardize recoverable error messages with consistent styling, accessible announcements, and retry actions.',
          14
        ),
        (
          'Add ticket activity timestamps',
          'Display when each ticket was created and last updated using readable relative dates with exact-date tooltips.',
          15
        ),
        (
          'Improve search result highlighting',
          'Highlight matching text in ticket titles and descriptions while preserving accessible screen-reader output.',
          16
        ),
        (
          'Add end-to-end tests for authentication',
          'Cover signup, login, logout, password recovery, session refresh, and protected-route redirects.',
          17
        ),
        (
          'Add end-to-end tests for ticket management',
          'Cover creating, editing, assigning, moving, searching, and deleting tickets from the dashboard.',
          18
        ),
        (
          'Configure application metadata and social previews',
          'Add accurate page titles, descriptions, icons, and Open Graph metadata for public routes.',
          19
        ),
        (
          'Add a global not-found page',
          'Provide a branded 404 page with a clear explanation and links back to the home page and dashboard.',
          20
        ),
        (
          'Review production security headers',
          'Configure appropriate content, framing, referrer, and transport security headers for the deployed application.',
          21
        ),
        (
          'Add client-side performance monitoring',
          'Capture key web-vital measurements and report significant regressions without collecting sensitive user data.',
          22
        )
    )
    insert into public.tickets (created_by, title, description, due_to)
    select
      'b3faa131-d6f7-41e2-951d-63f88a90faa8',
      ticket_seed.title,
      ticket_seed.description,
      current_date + ticket_seed.due_offset
    from ticket_seed
    where not exists (
      select 1
      from public.tickets
      where tickets.created_by = 'b3faa131-d6f7-41e2-951d-63f88a90faa8'
        and tickets.title = ticket_seed.title
    );
  end if;
end
$$;
