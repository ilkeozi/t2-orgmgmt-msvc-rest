import { IOrganizationRepo } from "../../../domain/aggregatesModel/organizationAggregate/interfaces/iOrganizationRepository"
import { Organization } from "../../../domain/aggregatesModel/organizationAggregate/organization"
import { OrganizationId } from "../../../domain/aggregatesModel/organizationAggregate/organizationId"
import *  as admin from "firebase-admin"
import { logMetrics } from "../../../shared/core/LogMetrics"

export class OrganizationRepository implements IOrganizationRepo{
    private models: any
    private db = admin.database()

    constructor (models:any) {
        this.models = models
    }

    @logMetrics()
    async exists(organizationId: string): Promise<boolean> {
        this.db.ref(`organizations/${organizationId}`).once('value')
        throw new Error("Method not implemented.");
    }

    @logMetrics()
    async getOrganizationById(organizationId: string): Promise<Organization> {
        this.db.ref(`organizations/${organizationId}`).once('value')
        throw new Error("Method not implemented.");
    }

    @logMetrics()
    async save(organization: Organization): Promise<void> {
        throw new Error("Method not implemented.");
    }

    @logMetrics()
    async saveBulk(organizations: Organization[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    @logMetrics()
    async deleteOrganization(organizationId: OrganizationId): Promise<void> {
        throw new Error("Method not implemented.");
    }
}