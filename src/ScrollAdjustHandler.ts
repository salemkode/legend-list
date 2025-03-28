import { type StateContext, peek$, set$ } from "./state";

export class ScrollAdjustHandler {
    private appliedAdjust = 0;
    private savedAdjust = 0;
    private busy = false;
    private context: StateContext;
    private isPaused = false;
    constructor(private ctx: any) {
        this.context = ctx;
    }

    private doAjdust() {
        set$(this.context, "scrollAdjust", this.savedAdjust);
        this.busy = false;
    }

    requestAdjust(adjust: number, onAdjusted: (diff: number) => void) {
        this.savedAdjust = adjust;
        if (this.isPaused) {
            return;
        }
        const oldAdjustTop = peek$<number>(this.context, "scrollAdjust");
        if (oldAdjustTop === adjust) {
            return;
        }

        this.appliedAdjust = adjust;

        if (!this.busy) {
            this.busy = true;
            this.doAjdust();
            onAdjusted(oldAdjustTop - adjust);
        }
    }
    getAppliedAdjust() {
        return this.appliedAdjust;
    }

    pauseAdjust() {
        console.log("Pause adjust");
        this.isPaused = true;
    }
    // return true if it was paused
    unPauseAdjust() {
        if (this.isPaused) {
            console.log("Un pause adjust");
            this.isPaused = false;
            this.doAjdust();
            return true;
        }
        return false;
    }
}
