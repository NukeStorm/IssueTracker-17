import React from 'react';
import { Label } from '../makeLabel';
import { LabelButton, MilestoneButton } from 'Components/common/';

export function TopLinks() {
  function toggleLabelInputEventHandler(e) {
    const detailForm = document.querySelector('.top-input-wrapper');
    detailForm.classList.toggle('hidden');
  }

  return (
    <div className="top-links-form">
      <div className="top-links">
        <div className="top-links-btn-wrapper">
          <LabelButton />
          <MilestoneButton />
        </div>
        <button
          className="new-label-btn"
          onClick={(e) => toggleLabelInputEventHandler(e)}
        >
          New Label
        </button>
      </div>
      <Label className={'top-input'} flag={1} />
    </div>
  );
}
