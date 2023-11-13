'use client'

import {CommandGroup, CommandItem, CommandList, CommandInput} from "@/src/components/ui/command"
import {Command as CommandPrimitive} from "cmdk"
import {useState, useRef, useCallback, type KeyboardEvent, Suspense} from "react"

import {cn} from "@/src/lib/utils"
import {Check} from "lucide-react"
import {SearchOption} from "@/src/types/posts/posts";
import {Separator} from "@/src/components/ui/separator"

type AutoCompleteProps = {
	options: SearchOption[] | undefined
	emptyMessage: string
	value?: SearchOption
	onSelectedValueChange?: (value: SearchOption) => void
	onSearchValueChange?: (value: string) => void
	isLoading?: boolean
	disabled?: boolean
	placeholder?: string
}

const Search = ({
									options,
									placeholder,
									emptyMessage,
									value,
									onSelectedValueChange,
									onSearchValueChange,
									disabled,
									isLoading = false,
								}: AutoCompleteProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const [isOpen, setOpen] = useState(false)
	const [selected, setSelected] = useState<SearchOption>(value as SearchOption)
	const [inputValue, setInputValue] = useState<string>(value?.label || "")

	const onInputChange = useCallback((value: string) => {
		setInputValue(value);
		onSearchValueChange && onSearchValueChange(value);
	}, [onSearchValueChange]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current
			if (!input) {
				return
			}

			// Keep the options displayed when the user is typing
			if (!isOpen) {
				setOpen(true)
			}

			// This is not a default behaviour of the <input /> field
			if (event.key === "Enter" && input.value !== "" && options) {
				const optionToSelect = options.find((option) => option.label === input.value)
				if (optionToSelect) {
					setSelected(optionToSelect)
					onSelectedValueChange?.(optionToSelect)
				}
			}

			if (event.key === "Escape") {
				input.blur()
			}
		},
		[isOpen, options, onSelectedValueChange]
	)

	const handleBlur = useCallback(() => {
		setOpen(false)
		setInputValue(selected?.label)
	}, [selected])

	const handleSelectOption = useCallback(
		(selectedOption: SearchOption) => {
			setInputValue(selectedOption.label)

			setSelected(selectedOption)
			onSelectedValueChange?.(selectedOption)

			// This is a hack to prevent the input from being focused after the user selects an option
			// We can call this hack: "The next tick"
			setTimeout(() => {
				inputRef?.current?.blur()
			}, 0)
		},
		[onSelectedValueChange]
	)

	return (
		<>
			<CommandPrimitive onKeyDown={handleKeyDown}>
				<div>
					<CommandInput
						ref={inputRef}
						value={inputValue}
						onValueChange={isLoading ? undefined : onInputChange}
						onBlur={handleBlur}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						disabled={disabled}
						className="w-96"
					/>
				</div>
				{isOpen && <div className="mt-1 relative">
			<div
				className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
				<CommandList className="ring-1 ring-slate-200 rounded-lg">
									{isLoading ? (
										<CommandPrimitive.Loading>
											<Suspense>
												<p className="text-center">Зареждане...</p>
											</Suspense>
										</CommandPrimitive.Loading>
									) : null}

									{options && options.length > 0 && !isLoading && (
										<CommandGroup>
											{options.map((option) => {
												const isSelected = selected?.value === option.value
												return (
													<CommandItem
														key={option.value}
														value={option.label}
														onMouseDown={(event) => {
															event.preventDefault()
															event.stopPropagation()
														}}
														onSelect={() => handleSelectOption(option)}
														className={cn("flex items-center gap-2 w-full cursor-pointer", !isSelected ? "pl-8" : null)}
													>
														{isSelected ? <Check className="w-4"/> : null}
														<h5 className="font-medium">{option.label}</h5>
														<p className="text-gray-500">{option.content}</p>
														<p>{option.views}</p>
													</CommandItem>
												)
											})}

											<Separator orientation="horizontal"/>

											<CommandItem
												value={inputValue}
												onMouseDown={(event) => {
													event.preventDefault()
													event.stopPropagation()
												}}
												onSelect={() => handleSelectOption({label: inputValue, value: inputValue})}
												className={cn("flex pl-8 items-center gap-2 w-full cursor-pointer")}
											>
												<p>Търсене за {inputValue}</p>
											</CommandItem>
										</CommandGroup>
									)}

									{!isLoading ? (
										<CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm text-center">
											{emptyMessage}
										</CommandPrimitive.Empty>
									) : null}
				</CommandList>
			</div>
		</div>}
			</CommandPrimitive>
		</>
	);
};

export default Search;