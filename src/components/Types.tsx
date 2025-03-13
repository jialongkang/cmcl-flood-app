export interface StationData {
  StationID: string;
  Label: string;
  Town: string;
  Lat: string;
  Long: string;
  River: string;
  Catchment: string;
  Status: string;
  Measure: string;
  Qualifier: string;
  Unit: string;
  County: string;
}

export interface DetailsResponse {
  items: {
    id: string; 
    RLOIid: string; 
    catchmentName: string; 
    dateOpened?: string; 
    datumOffset?: number; 
    eaAreaName?: string; 
    eaRegionName?: string; 
    easting?: number; 
    label: string; 
    lat: number; 
    long: number; 
    measures?: {
      id: string; 
      datumType?: string; 
      label?: string; 
      latestReading?: {
        dateTime: string;
        value: number;
      }; 
      notation?: string; 
    };
    northing?: number; 
    notation?: string; 
    riverName?: string; 
    stageScale?: {
      id: string; 
      datum?: number; 
      typicalRangeHigh?: number;
      typicalRangeLow?: number;
      highestRecent?: {
        value: number;
        dateTime: string;
      };
      maxOnRecord?: {
        value: number;
        dateTime: string;
      };
      minOnRecord?: {
        value: number;
        dateTime: string;
      };
    };
    downstageScale?: {
        id: string; 
        datum?: number; 
        typicalRangeHigh?: number;
        typicalRangeLow?: number;
        highestRecent?: {
          value: number;
          dateTime: string;
        };
        maxOnRecord?: {
          value: number;
          dateTime: string;
        };
        minOnRecord?: {
          value: number;
          dateTime: string;
        };
      };
    stationReference?: string; 
    status?: string; 
    statusDate?: string; 
    town?: string; 
    type?: string[]; 
    wiskiID?: string; 
  };
}

export interface ReadingsResponse {
    "@context"?: string; 
    meta?: Record<string, any>; 
    items: {
      id: string; 
      dateTime: string; 
      measure: string; 
      value: number; 
    }[];
  }
  