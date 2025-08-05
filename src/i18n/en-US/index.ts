export default {
  components: {
    AdbDeviceCard: {
      labels: {
        title: 'Available Devices',
        disconnect: 'Disconnect',
      },
      notifications: {
        connecting: 'Connecting to {deviceName}...',
        connectSuccess: 'Connected successfully: {deviceName}',
        connectError: 'Connection error: {deviceName}',
        disconnecting: 'Disconnecting {deviceName}...',
        disconnectSuccess: 'Disconnected successfully: {deviceName}',
        disconnectError: 'Disconnection error: {deviceName}',
      },
    },
    WorkflowCard: {
      labels: {
        title: 'Available Workflows',
        noWorkflow: 'No workflow selected',
        runRounds: 'Run rounds',
        runIndefinitely: 'Run indefinitely',
        roundsFinished: 'Finished rounds: {value}',
        runWorkflow: 'Run workflow',
        stopWorkflow: 'Stop workflow',
      },
      workflows: {
        autoFishing: {
          name: 'Auto Fishing',
          description: 'Automatically fish in the game',
        },
      },
      pipelines: {
        autoCastingAndLanding: {
          name: 'Auto Casting and Landing',
          description: 'Automatically cast and land the fishing rod',
        },
        checkAccessories: {
          name: 'Check Accessories',
          description: 'Ensure all necessary accessories are equipped',
        },
        startFishing: {
          name: 'Start Fishing',
          description: 'Navigate to the fishing scene',
        },
      },
      notifications: {
        pipelineError: 'Pipeline "{name}" threw an error',
        workflowFailure: 'Workflow "{name}" failed',
        workflowInterrupted: 'Workflow "{name}" was interrupted',
        workflowSuccess: 'Workflow "{name}" completed successfully',
      },
    },
    ThemeButton: {
      labels: {
        switchTheme: 'Switch Theme',
      },
    },
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        labels: {
          home: 'Home',
        },
      },
    },
    headers: {
      MainHeader: {
        labels: {
          title: 'MAA Star Resonance',
        },
        tooltips: {
          setAlwaysOnTop: 'Set Always on Top',
          unsetAlwaysOnTop: 'Unset Always on Top',
          minimize: 'Minimize',
          toggleMaximize: 'Toggle Maximize',
          close: 'Close',
        },
      },
    },
  },
  pages: {
    HomePage: {
      labels: {
        title: 'Home',
      },
    },
  },
};
