export type EventModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  contactSite: string;
  contactPhone: string;
  contactEmail: string;
  contactFacebook: string;
  contactTwitter: string;
  contactInstagram: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  managerSite: string;
  moreDetail: string;
  featured: boolean;
  ageIndicationId: number;
  imageId: number;
  locationId: number;
  eventStatus: "Ativo" | "Cancelado";
  eventPrivacy: "PRT" | "PBC";
  ageIndication: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  image: {
    id: number;
    file: string;
    fileUrl: string;
    galleryName: string;
  };
  location: {
    id: number;
    name: string;
  };
  organization: {
    id: number;
    name: string;
  };
  eventAccessibilities: Array<{
    id: number;
    eventId: number;
    accessibilityId: number;
    accessibility: {
      id: number;
      name: string;
    };
  }>;
  eventGalleries: Array<{
    id: number;
    eventId: number;
    galleryId: number;
    gallery: {
      id: number;
      file: string;
      galleryName: string;
      fileUrl: string;
    };
  }>;
};
