import { Button, Form, Input, DatePicker, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[\d\s-]+$/, "Invalid phone number"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  paymentAmount: yup
    .number()
    .required("Payment amount is required")
    .min(0, "Payment amount must be positive"),
  subscriptionStart: yup.date().required("Start date is required"),
  subscriptionEnd: yup
    .date()
    .required("End date is required")
    .min(yup.ref("subscriptionStart"), "End date must be after start date"),
});

interface CreateUserFormProps {
  onSuccess: () => void;
  initialData?: any;
}

const CreateUserForm = ({ onSuccess, initialData }: CreateUserFormProps) => {
  // Transform initial dates to dayjs objects if they exist
  const formattedInitialData = initialData
    ? {
        ...initialData,
        subscriptionStart: initialData.subscriptionStart
          ? dayjs(initialData.subscriptionStart)
          : undefined,
        subscriptionEnd: initialData.subscriptionEnd
          ? dayjs(initialData.subscriptionEnd)
          : undefined,
      }
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentAmount: 0,
        subscriptionStart: undefined,
        subscriptionEnd: undefined,
      };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formattedInitialData,
  });

  const onSubmit = async (data: any) => {
    try {
      // Convert dayjs objects back to string format before submitting
      const formattedData = {
        ...data,
        subscriptionStart: data.subscriptionStart
          ? data.subscriptionStart.format("YYYY-MM-DD")
          : null,
        subscriptionEnd: data.subscriptionEnd
          ? data.subscriptionEnd.format("YYYY-MM-DD")
          : null,
      };
      console.log("Form data:", formattedData);
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Form.Item
        label="Name"
        validateStatus={errors.name ? "error" : ""}
        help={`${errors.name?.message || ""}`}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={`${errors.email?.message || ""}`}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Phone"
        validateStatus={errors.phone ? "error" : ""}
        help={`${errors.phone?.message || ""}`}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Payment Amount"
        validateStatus={errors.paymentAmount ? "error" : ""}
        help={`${errors.paymentAmount?.message || ""}`}
      >
        <Controller
          name="paymentAmount"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              prefix="$"
              style={{ width: "100%" }}
              precision={2}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Subscription Start Date"
        validateStatus={errors.subscriptionStart ? "error" : ""}
        help={`${errors.subscriptionStart?.message || ""}`}
      >
        <Controller
          name="subscriptionStart"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              style={{ width: "100%" }}
              value={field.value ? dayjs(field.value) : null}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Subscription End Date"
        validateStatus={errors.subscriptionEnd ? "error" : ""}
        help={`${errors.subscriptionEnd?.message || ""}`}
      >
        <Controller
          name="subscriptionEnd"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              style={{ width: "100%" }}
              value={field.value ? dayjs(field.value) : null}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Address"
        validateStatus={errors.address ? "error" : ""}
        help={`${errors.address?.message || ""}`}
        className="md:col-span-2"
      >
        <Controller
          name="address"
          control={control}
          render={({ field }) => <Input.TextArea {...field} rows={3} />}
        />
      </Form.Item>

      <Form.Item className="mb-0 flex justify-end gap-2 md:col-span-2">
        <Button onClick={() => onSuccess()} className="mr-2">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
