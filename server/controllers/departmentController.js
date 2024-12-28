import Department from '../models/departmentModel.js';
import { appError, appSuccess } from '../utils/responseHelpers.js';

// Create a new department
export const createDepartment = async (req, res) => {
    try {
        const { name, description, managers } = req.body;

        // Create a new department
        const department = new Department({
            name,
            description,
            managers
        });

        await department.save();
        return appSuccess(res, 201, 'Department created successfully', department);
    } catch (err) {
        return appError(res, 500, 'Error creating department', err.message);
    }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return appSuccess(res, 200, 'Departments fetched successfully', departments);
    } catch (err) {
        return appError(res, 500, 'Error fetching departments', err.message);
    }
};

// Get a department by ID
export const getDepartmentById = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const department = await Department.findById(departmentId);

        if (!department) {
            return appError(res, 404, 'Department not found');
        }

        return appSuccess(res, 200, 'Department fetched successfully', department);
    } catch (err) {
        return appError(res, 500, 'Error fetching department', err.message);
    }
};

// Update a department
export const updateDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { name, description, managers } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, {
            name,
            description,
            managers
        }, { new: true });

        if (!updatedDepartment) {
            return appError(res, 404, 'Department not found');
        }

        return appSuccess(res, 200, 'Department updated successfully', updatedDepartment);
    } catch (err) {
        return appError(res, 500, 'Error updating department', err.message);
    }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const department = await Department.findByIdAndDelete(departmentId);

        if (!department) {
            return appError(res, 404, 'Department not found');
        }

        return appSuccess(res, 200, 'Department deleted successfully');
    } catch (err) {
        return appError(res, 500, 'Error deleting department', err.message);
    }
};

