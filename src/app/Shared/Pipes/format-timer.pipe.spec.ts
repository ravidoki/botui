import { TestBed } from '@angular/core/testing';
import { FormatTimerPipe } from './format-timer.pipe';

describe('FormatTimerPipe', () => {
  let pipe: FormatTimerPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FormatTimerPipe] });
    pipe = TestBed.inject(FormatTimerPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms time', () => {
    const value: number = 100;
    expect(pipe.transform(value)).toEqual('01:40');
  });
});
