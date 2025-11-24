import dayjs from "dayjs";

export function removeTemplateIfLastWord(str) {
  // Split the string by spaces
  if (str !== null) {
    let words = str?.split(" ");

    // Check if the last word is "Template"
    if (words[words?.length - 1]?.toLowerCase() === "template") {
      // Remove the last word
      words?.pop();
    }

    // Join the words back into a string
    return words?.join(" ");
  } else {
    return "";
  }
}

export function getRemarkCount(category, data) {
  let count = 0;
  data?.forEach((obj) => {
    if (obj.type === category) {
      count = obj.count;
    }
  });
  return count;
}

export function getRemarkCountForCategory(data) {
  const count = {
    functional: getRemarkCount("Functional", data),
    issue: getRemarkCount("Issue", data),
    limitation: getRemarkCount("Limitation", data),
    notInspected: getRemarkCount("Not Inspected", data),
    informational: getRemarkCount("Informational", data),
  };
  return count;
}

export function getRemarkCountForType(data) {
  const count = {
    template: data.templateRemarkCount,
    custom: data.customRemarkCount,
  };
  return count;
}

export const formateTime = (time) => {
  return dayjs(time).format("YYYY-MM-DD h:mm:ss ");
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export function hasDuplicateOrderNumber(data) {
  const orderNumbers = data.map((item) => item.orderNumber);
  const uniqueOrderNumbers = new Set(orderNumbers);
  return uniqueOrderNumbers.size !== orderNumbers.length;
}
