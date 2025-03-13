import { useEffect } from "react";
import axios from "axios";

interface FetchDataProps {
  stationId: string;
  onReadingsFetchSuccess: (data: any) => void;
  onDetailsFetchSuccess: (data: any) => void;
}

const FetchData = ({
  stationId,
  onReadingsFetchSuccess,
  onDetailsFetchSuccess,
}: FetchDataProps) => {
  useEffect(() => {
    async function fetchDetails() {
      const detailsUrl = `https://environment.data.gov.uk/flood-monitoring/id/stations/${stationId}`;
      try {
        const response = await axios.get(detailsUrl);
        onDetailsFetchSuccess(response.data);
        response.data.meta;
      } catch (error) {
        console.error("Failed to fetch station details:", error);
      }
    }

    async function fetchReadings() {
      const startDate = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      const readingsUrl = `https://environment.data.gov.uk/flood-monitoring/id/stations/${stationId}/readings?since=${startDate}`;
      try {
        const response = await axios.get(readingsUrl);
        onReadingsFetchSuccess(response.data);
      } catch (error) {
        console.error("Failed to fetch readings:", error);
      }
    }

    fetchDetails();
    fetchReadings();
  }, [stationId, onReadingsFetchSuccess, onDetailsFetchSuccess]);

  return null;
};

export default FetchData;
