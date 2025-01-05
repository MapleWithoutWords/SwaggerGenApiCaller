export enum ConsultationParameterType {
  String = 1,
  Number = 2,
  DateTime = 3,
  Text = 4,
  SingleChoice = 5,
  MultipleChoice = 6,
}
export enum PermissionType {
  Menu = 1,
  Element = 2,
}
export enum RequestContentType {
  Json = 1,
}
export enum RequestMethod {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}
export enum ServiceModel {
  Online = 1,
  Offline = 2,
}
export enum UserGender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}
export class AddTagDto {
  tagKeyId?: string;
  key: string = '';
  value: string = '';
}
export class AddUpdateAppSystemDto {
  code: string = '';
  name: string = '';
  description: string = '';
}
export class AddUpdateDataPermissionDto {
  name: string = '';
  code: string = '';
  description: string = '';
}
export class AddUpdateDepartmentBaseDto {
  name: string = '';
  order?: number;
  leaderUserId?: string;
}
export class AddUpdateGlobalSettingDto {
  key: string = '';
  value: string = '';
  description: string = '';
  isJson: boolean = true;
}
export class AddUpdateRoleDto {
  name: string = '';
  description: string = '';
  permissions: Array<string> = [];
  dataPermissions: Array<string> = [];
}
export class AddUpdateUserBaseDto {
  avatar: string = '';
  userName: string = '';
  email: string = '';
  name: string = '';
  phoneNumber: string = '';
  jobTitle: string = '';
  employeeNo: string = '';
  departmentIds: Array<string> = [];
}
export class AppSystemItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  code: string = '';
  name: string = '';
  description: string = '';
}
export class ChangePasswordDto {
  oldPassword: string = '';
  newPassword: string = '';
}
export class DataPermissionItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  name: string = '';
  code: string = '';
  description: string = '';
}
export class DepartmentItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  name: string = '';
  code: string = '';
  parentId?: string;
  memberCount?: number;
  order?: number;
  leaderUserId?: string;
}
export class GlobalSettingItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  key: string = '';
  value: string = '';
  description: string = '';
  isJson: boolean = true;
}
export class PasswordLoginDto {
  userName: string = '';
  password: string = '';
  rememberMe: boolean = true;
}
export class PermissionDto {
  targetId?: string;
  permissionId?: string;
  isExclusion: boolean = true;
  targetName: string = '';
  permissionCode: string = '';
  permissionName: string = '';
}
export class RoleItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  name: string = '';
  description: string = '';
}
export class StringStringKeyValuePair {
  key: string = '';
  value: string = '';
}
export class TagItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  tagKeyId?: string;
  key: string = '';
  value: string = '';
}
export class TagKeyItemDto {
  id: string = '';
  key: string = '';
}
export class UpdateTagDto {
  value: string = '';
}
export class AddDepartmentDto extends AddUpdateDepartmentBaseDto {
  code: string = '';
  parentId?: string;
}
export class AddUpdateConsultationTypeParameterDto {
  name: string = '';
  code: string = '';
  order?: number;
  type?: ConsultationParameterType;
  required: boolean = true;
  display: boolean = true;
  defaultValue: string = '';
}
export class AddUpdatePermissionDto {
  appSystemId?: string;
  code: string = '';
  name: string = '';
  url: string = '';
  description: string = '';
  type?: PermissionType;
  order?: number;
  parentId?: string;
  enabled: boolean = true;
}
export class AddUserDto extends AddUpdateUserBaseDto {
  password: string = '';
}
export class AppSystemItemDtoPagedResultDto {
  total: string = '';
  items: Array<AppSystemItemDto> = [];
}
export class ConsultationTypeItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  name: string = '';
  description: string = '';
  amount?: number;
  protocolContent: string = '';
  enabled: boolean = true;
  order?: number;
  serviceModel?: ServiceModel;
  tagId?: string;
}
export class ConsultationTypeItemDtoPagedResultDto {
  total: string = '';
  items: Array<ConsultationTypeItemDto> = [];
}
export class DataPermissionItemDtoPagedResultDto {
  total: string = '';
  items: Array<DataPermissionItemDto> = [];
}
export class DepartmentDetailDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  name: string = '';
  code: string = '';
  parentId?: string;
  memberCount?: number;
  order?: number;
  leaderUserId?: string;
  chatId?: string;
  roles: Array<RoleItemDto> = [];
}
export class DepartmentItemDtoPagedResultDto {
  total: string = '';
  items: Array<DepartmentItemDto> = [];
}
export class GlobalSettingItemDtoPagedResultDto {
  total: string = '';
  items: Array<GlobalSettingItemDto> = [];
}
export class PermissionItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  appSystemId?: string;
  code: string = '';
  name: string = '';
  url: string = '';
  description: string = '';
  type?: PermissionType;
  order?: number;
  parentId?: string;
  enabled: boolean = true;
}
export class PermissionItemDtoPagedResultDto {
  total: string = '';
  items: Array<PermissionItemDto> = [];
}
export class RoleDetailDto extends RoleItemDto {
  permissions: Array<string> = [];
  dataPermissions: Array<string> = [];
}
export class RoleItemDtoPagedResultDto {
  total: string = '';
  items: Array<RoleItemDto> = [];
}
export class TagItemDtoPagedResultDto {
  total: string = '';
  items: Array<TagItemDto> = [];
}
export class TagKeyItemDtoPagedResultDto {
  total: string = '';
  items: Array<TagKeyItemDto> = [];
}
export class TreeDto {
  id: string = '';
  name: string = '';
  parentId?: string;
  order?: number;
  children: Array<TreeDto> = [];
}
export class UpdateDepartmentDto extends AddUpdateDepartmentBaseDto {
}
export class UpdateUserDto extends AddUpdateUserBaseDto {
}
export class UserBasicDto {
  id: string = '';
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  gender?: UserGender;
  avatar: string = '';
  name: string = '';
  jobTitle: string = '';
  employeeNo: string = '';
}
export class UserBasicDtoPagedResultDto {
  total: string = '';
  items: Array<UserBasicDto> = [];
}
export class UserItemDto {
  id: string = '';
  createTime?: Date;
  createUserId?: string;
  updateTime?: Date;
  updateUserId?: string;
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  lockoutEnd?: Date;
  lockoutEnabled: boolean = true;
  accessFailedCount?: number;
  gender?: UserGender;
  avatar: string = '';
  name: string = '';
  isResigned: boolean = true;
  resignedDate?: Date;
  jobTitle: string = '';
  employeeNo: string = '';
  departmentIds: Array<string> = [];
  departmentNames: Array<string> = [];
}
export class UserItemDtoPagedResultDto {
  total: string = '';
  items: Array<UserItemDto> = [];
}
export class AllotUserPermissionDto {
  roleIds: Array<string> = [];
  subjectPermissions?: Record<string, boolean>;
  subjectDataPermissions?: Record<string, boolean>;
}
export class PermissionTreeDto {
  id: string = '';
  appSystemId?: string;
  code: string = '';
  name: string = '';
  type?: PermissionType;
  order?: number;
  parentId?: string;
  enabled: boolean = true;
  isPermission: boolean = true;
  children: Array<PermissionTreeDto> = [];
}
export class RolePermissionDto {
  permissions: Array<PermissionDto> = [];
  dataPermissions: Array<PermissionDto> = [];
}
export class AddUpdateConsultationTypeDto {
  identity: string = '';
  name: string = '';
  description: string = '';
  amount?: number;
  protocolContent: string = '';
  enabled: boolean = true;
  order?: number;
  serviceModel?: ServiceModel;
  tagId?: string;
  consultationTypeParameters: Array<AddUpdateConsultationTypeParameterDto> = [];
  consultationTypeCallers: Array<AddUpdateConsultationTypeCallerDto> = [];
}
export class ConsultationTypeDetailDto extends ConsultationTypeItemDto {
  consultationTypeParameters: Array<AddUpdateConsultationTypeParameterDto> = [];
  consultationTypeCallers: Array<AddUpdateConsultationTypeCallerDto> = [];
}
export class UserDetailDto extends UserItemDto {
  roleIds: Array<string> = [];
  departmentRoleIds: Array<string> = [];
  permissions: Array<PermissionDto> = [];
  dataPermissions: Array<PermissionDto> = [];
}
export class AddUpdateConsultationTypeCallerDto {
  name: string = '';
  requestMethod?: RequestMethod;
  requestUrl: string = '';
  requestParameters: Array<StringStringKeyValuePair> = [];
  requestHeaders: Array<StringStringKeyValuePair> = [];
  requestBody: string = '';
  requestContentType?: RequestContentType;
  isSend: boolean = true;
}
