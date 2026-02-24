---
name: cv-demo-room-sweep-adjustments
overview: Simplify the UI by removing the about section and tweak logic and copy so sweeping the camera around the room becomes a recommended and effective usage pattern.
todos:
  - id: remove-about-section
    content: Remove the About this demo section from PeopleCounter and rebalance spacing so focus is on camera and counts
    status: completed
  - id: update-sweep-copy
    content: Update text to recommend slowly sweeping the camera around the room so everyone is seen at least once
    status: completed
  - id: add-sweep-aware-metric
    content: Extend estimation logic with a max-over-window or sweep-aware metric so sweeping the room gives a stable total people estimate
    status: completed
isProject: false
---

## Room Sweep UX and Logic Adjustments

### 1. Remove the About section from the main layout

- **Goal**: Clean up the interface so the focus is entirely on the camera and counts, especially on mobile.
- **Files to touch**:
  - `[components/PeopleCounter.tsx](components/PeopleCounter.tsx)`
- **Changes**:
  - Remove the lower/right-hand "About this demo" section from the JSX.
  - Ensure spacing still looks good on desktop after the section is removed (possibly adjust outer container gap/margins if needed).

### 2. Make “sweeping the room” a first-class usage pattern

- **Goal**: Guide the user to slowly pan the camera around the room and make the logic behave well for that scenario.
- **Files to touch**:
  - `[components/PeopleCounter.tsx](components/PeopleCounter.tsx)`
- **Changes**:
  - Update the descriptive copy near the counts and/or a small help paragraph below the video to say something like:
    - "For best results, slowly sweep the camera around the room so everyone appears in the frame at least once."
  - Keep wording concise so it reads well on mobile.

### 3. Adjust estimation logic to suit room sweeping

- **Goal**: When the user sweeps around the room, the estimate should tend toward the total number of unique people seen, not just those in the current view.
- **Files to touch**:
  - `[components/PeopleCounter.tsx](components/PeopleCounter.tsx)`
- **Changes**:
  - Add an additional metric that tracks the **maximum estimated count** seen over the last sweep window (e.g., last 20–30 seconds), for example `maxEstimatedCount`.
  - Simple approach:
    - Continue to compute the median-based `estimatedCount` over ~10s as you already do.
    - Maintain a `maxEstimatedCount` that is the maximum of `estimatedCount` over a longer window; decay/reset it slowly (e.g., after 30–60 seconds of no increases) so the user can do a new sweep.
  - In the UI:
    - Keep "Estimated People in Room" as the primary large number (based on recent median) or change its description to emphasize it assumes a sweep.
    - Optionally label `maxEstimatedCount` as "Max estimated during this sweep" in a smaller line, or integrate it directly into the main label if you prefer a single number.

### 4. Final visual and copy polish

- **Goal**: Ensure the interface is still minimal, modern, and self-explanatory.
- **Files to touch**:
  - `[components/PeopleCounter.tsx](components/PeopleCounter.tsx)`
- **Changes**:
  - Double-check spacing on mobile and desktop after removing the About section (no large empty area).
  - Ensure the short instructions about sweeping the room and on-device processing are visible but do not overshadow the counts.

### 5. Quick verification

- **Goal**: Confirm the new behavior matches your desired demo flow.
- **Steps**:
  - Run `npm run dev` and open the site on your phone.
  - Try slowly sweeping the camera around a room with a few people:
    - Confirm the primary estimate stabilizes and the max/sweep-aware behavior feels intuitive.
    - Confirm there is no build error and UI looks clean without the About section.

