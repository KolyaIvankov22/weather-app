export interface WeatherState {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface WeatherDetailsProps {
  data: {
    main: {
      feels_like?: number;
      humidity?: number;
    };
    visibility?: number;
    wind: {
      speed?: number;
    };
  };
}

export interface WeatherSearchFormProps {
  animate: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
}

export interface WeatherIconProps {
  weatherMain?: string | null;
}

export interface AnimationRefType {
  current: HTMLElement | null;
}

export interface LoaderProps {
  timeline: gsap.core.Timeline | null;
}

export interface CursorProps {
  isActive: boolean;
}

export interface Mouse {
  x: number;
  y: number;
}
