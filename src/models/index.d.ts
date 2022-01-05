import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type BizOwnerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RegistrationQnsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class BizOwner {
  readonly id: string;
  readonly ownerID?: string;
  readonly username?: string;
  readonly role?: string;
  readonly status?: string;
  readonly lname?: string;
  readonly fname?: string;
  readonly street?: string;
  readonly unit?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: string;
  readonly questionnaireId?: string;
  readonly businessName?: string;
  readonly businessDBAName?: string;
  readonly businessLogo?: string;
  readonly businessEmail?: string;
  readonly businessPhone?: string;
  readonly businessURL?: string;
  readonly practiceType?: string;
  readonly mobileClinicType?: string;
  readonly missionStatement?: string;
  readonly visionStatement?: string;
  readonly aboutBusiness?: string;
  readonly ownerBiodata?: string;
  readonly businessLicenseNumber?: string;
  readonly businessLicenseAcquiredDate?: string;
  readonly businessLicenseExpiryDate?: string;
  readonly professionalLicenseName?: string;
  readonly professionalLicenseNumber?: string;
  readonly professionalLicenseAcquiredDate?: string;
  readonly professionalLicenseExpiryDate?: string;
  readonly hygieneAssociationMembership?: string;
  readonly hygieneAssociationMembershipExpiryDate?: string;
  readonly aDAMembership?: string;
  readonly aDAMembershipExpiryDate?: string;
  readonly continuingEducationHours?: string;
  readonly continuingEducationHoursExpiryDate?: string;
  readonly cPRNumber?: string;
  readonly cPRNumberExpiryDate?: string;
  readonly financialInstituteName?: string;
  readonly primaryDentist?: string;
  readonly primaryDentistPhone?: string;
  readonly primaryDentistEmail?: string;
  readonly secondaryDentist?: string;
  readonly secondaryDentistPhone?: string;
  readonly secondaryDentistEmail?: string;
  readonly lawyerName?: string;
  readonly lawyerPhone?: string;
  readonly lawyerEmail?: string;
  readonly accountantName?: string;
  readonly accountantPhone?: string;
  readonly accountantEmail?: string;
  readonly websiteDesigner?: string;
  readonly websiteSupport?: string;
  readonly targetMarket?: string;
  readonly socialMediaMarketing?: string;
  readonly oldfashionedMarketing?: string;
  readonly businessReviewsURL?: string;
  readonly module1ActionsCompleted?: string;
  readonly module2ActionsCompleted?: string;
  readonly module3ActionsCompleted?: string;
  readonly module4ActionsCompleted?: string;
  readonly module5ActionsCompleted?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BizOwner, BizOwnerMetaData>);
  static copyOf(source: BizOwner, mutator: (draft: MutableModel<BizOwner, BizOwnerMetaData>) => MutableModel<BizOwner, BizOwnerMetaData> | void): BizOwner;
}

export declare class RegistrationQns {
  readonly id: string;
  readonly questionnaireId?: string;
  readonly passion?: string;
  readonly othersInterest?: string;
  readonly planB?: string;
  readonly pricePoint?: string;
  readonly competition?: string;
  readonly growBusiness?: string;
  readonly insuranceNeeds?: string;
  readonly costOfEntry?: string;
  readonly monthlyLivingExpenses?: string;
  readonly readyAndDriven?: string;
  readonly additionalNotes1?: string;
  readonly additionalNotes2?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RegistrationQns, RegistrationQnsMetaData>);
  static copyOf(source: RegistrationQns, mutator: (draft: MutableModel<RegistrationQns, RegistrationQnsMetaData>) => MutableModel<RegistrationQns, RegistrationQnsMetaData> | void): RegistrationQns;
}