type Type = "restaurants" | "hotels" | "attractions";

type ResponseData = {
  data: [
    {
      location_id: string;
      name: string;
      latitude: string;
      longitude: string;
      num_reviews: string;
      timezone: string;
      location_string: string;
      awards: any[];
      doubleclick_zone: string;
      preferred_map_engine: string;
      raw_ranking: string;
      ranking_geo: string;
      ranking_geo_id: string;
      ranking_position: string;
      ranking_denominator: string;
      ranking_category: Type;
      ranking: string;
      distance: string | null;
      distance_string: string | null;
      bearing: string;
      rating: string;
      is_closed: boolean;
      is_long_closed: boolean;
      price_level: string;
      description: string;
      web_url: string;
      write_review: string;
      ancestors: {
        subcategory: {
          key: string;
          name: string;
        }[];
        name: string;
        abbrv: null;
        location_id: string;
      }[];
      category: {
        key: string;
        name: string;
      };
      subcategory: {
        key: string;
        name: string;
      }[];
      parent_display_name: string;
      is_jfy_enabled: boolean;
      nearest_metro_station: [];
      phone: string;

      photo: {
        caption: string;
        helpful_votes: string;
        id: string;
        images: {
          small: {
            height: string;
            width: string;
            url: string;
          };
          thumbnail: {
            height: string;
            width: string;
            url: string;
          };
          original: {
            height: string;
            width: string;
            url: string;
          };
          large: {
            height: string;
            width: string;
            url: string;
          };
          medium: {
            height: string;
            width: string;
            url: string;
          };
        };
        is_blessed: true;
        published_date: "2019-05-12T14:00:01-0400";
        uploaded_date: "2019-05-12T14:00:01-0400";
      };

      address_obj: {
        street1: string;
        street2: string;
        city: string;
        state: null;
        country: string;
        postalcode: string;
      };
      address: string;
      is_candidate_for_contact_info_suppression: boolean;
      cuisine: any[];
      dietary_restrictions: any[];
      establishment_types: {
        key: string;
        name: string;
      }[];
      website: string;
    }
  ];
};
