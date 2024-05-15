export const checkDevTool = () => {

    // Process prevent & prevent noti spam
    const preventDevTool = (e: any) => {
        // Stop browser open dev tool
        e.preventDefault();
    }

    //prevent open context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    })

    document.addEventListener('keydown', (e: any) => {
        // Prevent F12
        if (e.code === 'F12') {
            preventDevTool(e)
        }

        //User are holding Cmd on Mac or Ctrl on Window + Shift/Opt/Return
        if (e.metaKey && (e.altKey || e.shiftKey)) {
            // Check if the key pressed is 'i' or 'c'
            if (e.key === 'i' || e.code === 'KeyI' || e.key === 'c' || e.code === 'KeyC' || e.key === 'j' || e.code === 'KeyJ' || e.key === 'u' || e.code === 'KeyU') {
                preventDevTool(e)
            }
        }

        //User are holding Cmd on Mac or Ctrl on Window or any combination
        if (e.metaKey || e.altKey) {
            // Check if the key pressed is 'u'
            if (e.key === 'u' || e.code === 'KeyU') {
                preventDevTool(e)
            }
        }
    })

}