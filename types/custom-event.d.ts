interface WindowEventHandlersEventMap {
  'command.dialog.open': CustomEvent<{}>
  'image.dialog.open': CustomEvent<{
    source: string
    alt?: string
  }>
}
