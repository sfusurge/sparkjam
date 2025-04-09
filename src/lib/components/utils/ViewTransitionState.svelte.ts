
type SlideDirection = 'left' | 'right' | 'up' | 'down';
type CrossFadeSlideDirection = 'fadeLeft' | 'fadeRight' | 'fadeUp' | 'fadeDown';
export interface SlideTranitionProps {
    transition: SlideDirection | CrossFadeSlideDirection | 'none';
    reverse: boolean;
}

export const transitionType = $state<SlideTranitionProps>({
    transition: 'left',
    reverse: false
});