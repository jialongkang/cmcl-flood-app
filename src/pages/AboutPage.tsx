import api_response_png from "../assets/api_response.png";
import chart_yaxis_logic_png from "../assets/chart_yaxis_logic.png";
import googlemaps_api_png from "../assets/googlemaps_api.png";
import react_routes_png from "../assets/react_routes.png";

function AboutPage() {
  return (
    <>
      <div className="mt-4"></div>

      <p className="h1 mb-4">About</p>
      <p className="text-muted">
        Here I will outline the process and technologies behind this tool. The
        codebase can be found at this public
        <a
          href="https://github.com/jialongkang/cmcl-river-gauge-web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary fw-bold"
          style={{ textDecoration: "none", marginLeft: "5px" }}
        >
          Github repository.
        </a>
      </p>

      <p className="h4 mt-5 mb-4">Introduction</p>
      <p className="text-muted">
        This website was created as part of the application process for a
        Computational Scientist role at Computational Modelling Cambridge Ltd.
        (CMCL). The task was to build a tool (webpage, script, desktop
        application etc.) that interacts with the Environmental Agency's (EA)
        Real Time flood-monitoring API, allows users to select individual
        measurement stations and view a line graph of that station's readings
        over the last 24 hours.
      </p>
      <p className="text-muted">
        To complete this task to the desired quality, I learnt all of the
        following libraries/technologies from scratch:
      </p>
      <ul className="text-muted">
        <li>ReactJS</li>
        <li>Bootstrap CSS</li>
        <li>Chart.js</li>
        <li>Google Maps API</li>
        <li>GeoPy</li>
        <li>Node.js</li>
      </ul>

      <p className="h4 mt-5 mb-4">ReactJS — Front-end Javascript library</p>
      <div className="text-center">
        <img src={react_routes_png} alt="react_routes" className="img-fluid" />
        <p className="mt-2 text-muted">
          <i>React App.tsx component routes</i>
        </p>
      </div>
      <p className="text-muted">
        My background and expertise lies in Physics, so although I had lots of
        experience with techniques in computational science, this was my first
        attempt at building software up to professional standards and with
        concerns for UX. Thus, to complete this task,
        <strong>I learnt ReactJS</strong> and
        <strong>applied best-practice methods</strong> for dividing
        functionalities across components and ensuring clean, reusable
        components. I also used Bootstrap CSS templates to handle fonts and
        common objects like buttons, as React and Bootstrap at both the most
        popular libraries for professional web development.
      </p>
      <p className="text-muted">
        The general design concept was to have dedicated 'Page' components which
        handled routing between different pages on the site and acted as parent
        components passing Callback functions into children components. The
        children components, such as Lists, Tables, or Charts, then handled more
        complex processing and formatting logic to render specific items on the
        pages. For example, I also made a dedicated component which fetched the
        river gauge data from the API using Axios, as well as a 'Types'
        component keeping track of common data structures and their expected
        typings, i.e. making use of Typescript to detect errors at compile time.
        The benefit of this overall structure is that children components can be
        easily repurposed, and the page components have clear/readable
        logic—making the codebase robust for future improvements from different
        coders.
      </p>
      <p className="text-muted">
        For example, I have a single 'Page' component dedicated to displaying
        the recent readings of a particular station. The modularity of the
        fetching and chart components used on this page means that it only takes
        a single page component for all 3000 stations.
      </p>

      <p className="h4 mt-5 mb-4">Environmental Agency API — Axios & GeoPy</p>
      <div className="text-center">
        <img src={api_response_png} alt="api_response" className="img-fluid" />
        <p className="mt-2 text-muted">
          <i>Example API response for a single station</i>
        </p>
      </div>
      <p className="text-muted">
        The API data is fetched using the <strong>Axios library</strong> which
        sends HTTP requests to the Environmental Agency servers and retrieves
        data in JSON format. Working with the API presented several challenges,
        mostly due to the incomplete nature of data provided, where key items
        like the active/closed status and geocoordinates could be missing from
        any given station. The station information and recent readings can be
        found by specifying urls like
        https://environment.data.gov.uk/flood-monitoring/id/stations/stationId,
        and
        https://environment.data.gov.uk/flood-monitoring/id/stations/$stationId/readings?since=startDate,
        where we can use query conditions using "?..." as needed.
      </p>
      <p className="text-muted">
        With over 5000 total stations, although many data entries are unlabelled
        or refer to suspended stations, the obvious consideration for UX was to
        group the stations by the county they are found in (as similar websites
        do). But crucially, the API response does not provide the county
        information anywhere, which means that I couldn't dynamically display a
        list of stations directly from a fetch request. Instead, I had to use a{" "}
        <strong>Python package called GeoPy</strong> to reverse-identify the
        county based on the geocoordinates of the station. Unfortunately, this
        means the lists displayed on the 'Stations' page are rendered using a
        pre-processed JSON catalogue of the stations—cleaned up and containing
        the station IDs to then make Axios fetches for recent readings. This is
        a bit of a weakness, as it means the website cannot automatically adapt
        to newly established stations, but it was the best solution I found for
        this API.
      </p>

      <p className="h4 mt-5 mb-4">Google Maps API — Map View</p>
      <div className="text-center">
        <img
          src={googlemaps_api_png}
          alt="googlemaps_api"
          className="img-fluid"
        />
        <p className="mt-2 text-muted">
          <i>React Google Maps API</i>
        </p>
      </div>
      <p className="text-muted">
        Only having lists of stations to scroll through is boring for users and
        not useful for finding stations in specific areas you care about, so the
        next step was creating a map view of all the stations in England. To
        achieve this, I used the React Google Maps API which provides easy
        methods to including a map within a React web page. Once again, I simply
        parsed the geocoordinate (lat, lon) info of the stations provided by the
        EA API and displayed markers on those locations. To improve UX, the map
        is restricted to the general UK region, and automatically zooms into a
        station upon clicking its marker. At the same time, a small popup
        appears which displays the basic station info and takes you to the page
        displaying its recent readings. This was a relatively simple process but
        nevertheless required familiarising myself with another API and library.
      </p>

      <p className="h4 mt-5 mb-4">Chart.js — Line graphs</p>
      <div className="text-center">
        <img
          src={chart_yaxis_logic_png}
          alt="chart_yaxis_logic"
          className="img-fluid"
        />
        <p className="mt-2 text-muted">
          <i>Logic for modifying y-axis range in line charts</i>
        </p>
      </div>
      <p className="text-muted">
        To display a line graph of the recent station readings from the last 24
        hours, I used a common React-adjacent library called Chart.js. This
        component was probably the most involved and ugly piece of code, as I
        had to handle very specific formatting conditions.
      </p>
      <p className="text-muted">
        First of all, the station readings API response outputs a single array
        of items, each of which containing a measure ID, a datetime record, and
        the value recorded. But this can be a mixture of multiple types of
        measures, like the water level at different stages or the flow rate,
        which means I had to first group the data with their measure ID, and
        create a complex script to create separate charts for each type of
        measure.
      </p>
      <p className="text-muted">
        But just seeing the recent readings gives us no useful information on
        flooding risks by itself, so I also incorporated a shaded area of the
        'typical water level range' using values provided by the EA API. The
        issue I then found was that the magnitude of water level fluctuations
        within 24 hours was much smaller than the size of the typical range,
        which means plotting both on the same chart meant all our readings
        turned to straight lines. Since the task was to view the past 24h
        readings, it was important to consider both the current fluctuations and
        the scale in comparison to acceptable ranges. So to do this, I adapted
        the script to allow the click of a button to add the typical range and
        adjust the y-axis boundaries accordingly. This way we can toggle the
        typical range to evaluate whether the water level is above normal and
        therefore at risk of flooding.
      </p>

      <div className="mb-5"></div>
    </>
  );
}

export default AboutPage;
