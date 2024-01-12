"use client"
import React, { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import styles from "./styles.module.css"

interface Option {
  label: string
  value: string
}

interface CustomDropdownProps {
  options: Option[]
  onSelect: (option: Option) => void
  placeholder: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(option)
  }

  return (
    <div className={styles.custom_dropdown}>
      <div
        className={styles.dropdown_header}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className={styles.placeholder}>
            <p>{placeholder}</p>
          </span>
        )}
        <span className={`${styles.arrow} ${isOpen ? "open" : ""}`}>
          <IoIosArrowDown />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.dropdown_list}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomDropdown
