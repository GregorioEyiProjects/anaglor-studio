import { useCallback, useEffect, useState } from "react";
import {
  DEMO_CONFIRMED_STUDENT_COUNT,
  getConfirmedStudentCount,
} from "../services/alumnadoService";

const useConfirmedStudentCount = () => {
  const [count, setCount] = useState(DEMO_CONFIRMED_STUDENT_COUNT);

  const refresh = useCallback(async () => {
    const nextCount = await getConfirmedStudentCount();
    if (Number.isInteger(nextCount) && nextCount >= 0) setCount(nextCount);
  }, []);

  useEffect(() => {
    let active = true;

    const loadInitialCount = async () => {
      const nextCount = await getConfirmedStudentCount();
      if (active && Number.isInteger(nextCount) && nextCount >= 0) {
        setCount(nextCount);
      }
    };

    loadInitialCount();
    return () => {
      active = false;
    };
  }, []);

  return { count, refresh };
};

export default useConfirmedStudentCount;
