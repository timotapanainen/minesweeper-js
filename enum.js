const GameState = {
    Ready: Symbol('Ready'),
    Running: Symbol('Running'),
    Succeeded: Symbol('Succeeded'),
    Failed: Symbol('Failed'),

    toString: function(state) {
        switch (state) {
            case GameState.Ready:
                return "READY";
            case GameState.Running:
                return "RUNNING";
            case GameState.Failed:
                return "FAILED";
            case GameState.Succeeded:
                return "SUCCEEDED";
        }
    }
}

module.exports = GameState;