
import API from './auth.api';

export type AssignmentStatus = 'Draft' | 'Published' | 'Closed';

export type SubmissionStatus =
  | 'Submitted'
  | 'Graded'
  | 'Late'
  | 'Resubmitted';

export interface AssignmentReference {
  _id: string;
  title?: string;
  name?: string;
}

export interface AssignmentUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
}

export interface Assignment {
  _id: string;
  title: string;
  instructions: string;
  courseId: string | AssignmentReference;
  lessonId?: string | AssignmentReference | null;
  createdBy?: string | AssignmentUser;
  dueDate?: string | null;
  maxScore: number;
  fileAttachmentUrl?: string;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface AssignmentPagination {
  page?: number;
  limit?: number;
  total?: number;
  totalResults?: number;
  totalPages?: number;
}

export interface AssignmentQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  status?: AssignmentStatus;
  courseId?: string;
}

export interface CreateAssignmentPayload {
  courseId: string;
  lessonId?: string;
  title: string;
  instructions: string;
  dueDate?: string;
  maxScore?: number;
  fileAttachmentUrl?: string;
  status?: AssignmentStatus;
}

export type UpdateAssignmentPayload =
  Partial<Omit<CreateAssignmentPayload, 'courseId'>>;

export interface AssignmentSubmission {
  _id: string;
  assignmentId: string | Assignment;
  studentId: string | AssignmentUser;
  submittedText?: string;
  submittedFileUrl?: string;
  submittedAt: string;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  gradedBy?: string | AssignmentUser;
  gradedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmitAssignmentPayload {
  submittedText?: string;
  submittedFileUrl?: string;
}

export interface GradeSubmissionPayload {
  score: number;
  feedback?: string;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

interface AssignmentListResponse
  extends ApiResponse<{ assignments: Assignment[] }> {
  pagination?: AssignmentPagination;
}

interface SubmissionListResponse
  extends ApiResponse<{ submissions: AssignmentSubmission[] }> {
  results?: number;
}

const assignmentsApi = {
  async getAssignments(query: AssignmentQuery = {}) {
    const response = await API.get<AssignmentListResponse>(
      '/assignments',
      { params: query },
    );

    return {
      assignments: response.data.data.assignments,
      pagination: response.data.pagination,
    };
  },

  async getAssignment(id: string): Promise<Assignment> {
    const response = await API.get<
      ApiResponse<{ assignment: Assignment }>
    >(`/assignments/${id}`);

    return response.data.data.assignment;
  },

  async createAssignment(
    payload: CreateAssignmentPayload,
  ): Promise<Assignment> {
    const response = await API.post<
      ApiResponse<{ assignment: Assignment }>
    >('/assignments', payload);

    return response.data.data.assignment;
  },

  async updateAssignment(
    id: string,
    payload: UpdateAssignmentPayload,
  ): Promise<Assignment> {
    const response = await API.put<
      ApiResponse<{ assignment: Assignment }>
    >(`/assignments/${id}`, payload);

    return response.data.data.assignment;
  },

  async deleteAssignment(id: string): Promise<void> {
    await API.delete(`/assignments/${id}`);
  },

  async submitAssignment(
    id: string,
    payload: SubmitAssignmentPayload,
  ): Promise<AssignmentSubmission> {
    const response = await API.post<
      ApiResponse<{ submission: AssignmentSubmission }>
    >(`/assignments/${id}/submissions`, payload);

    return response.data.data.submission;
  },

  async getSubmissions(
    id: string,
  ): Promise<AssignmentSubmission[]> {
    const response = await API.get<SubmissionListResponse>(
      `/assignments/${id}/submissions`,
    );

    return response.data.data.submissions;
  },

  async gradeSubmission(
    assignmentId: string,
    submissionId: string,
    payload: GradeSubmissionPayload,
  ): Promise<AssignmentSubmission> {
    const response = await API.patch<
      ApiResponse<{ submission: AssignmentSubmission }>
    >(
      `/assignments/${assignmentId}/submissions/${submissionId}/grade`,
      payload,
    );

    return response.data.data.submission;
  },
};

export default assignmentsApi;
