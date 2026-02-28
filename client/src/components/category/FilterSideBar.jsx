import './filterSidebar.css'
import { useDispatch, useSelector } from "react-redux";
import {
  setDraftType,
  setDraftPrice,
  toggleDraftSize,
  toggleDraftColor,
  applyFilters,
} from "../../store/slices/filterSlice";
import { fetchCategories } from "../../store/category/categoryThunk";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useEffect } from 'react';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function FilterSidebar({ onApply, onClose }) {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const dispatch = useDispatch();
  const draftFilters = useSelector(state => state.filters.draft);
  const products = useSelector(state => state.products.list);
  const categories = useSelector(state => state.category.categories || []);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const colors = [
    { name: "green", fill: "#22c55e", border: "#16a34a" },
    { name: "red", fill: "#ef4444", border: "#dc2626" },
    { name: "yellow", fill: "#fde047", border: "#eab308" },
    { name: "orange", fill: "#f97316", border: "#ea580c" },
    { name: "cyan", fill: "#06b6d4", border: "#0891b2" },
    { name: "blue", fill: "#2563eb", border: "#1d4ed8" },
    { name: "purple", fill: "#7c3aed", border: "#6d28d9" },
    { name: "pink", fill: "#ec4899", border: "#db2777" },
    { name: "white", fill: "#ffffff", border: "#d1d5db" },
    { name: "black", fill: "#000000", border: "#000000" },
  ];

  const ALL_SIZES = [
    { label: "XX-Small", value: "XXS" },
    { label: "X-Small", value: "XS" },
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "X-Large", value: "XL" },
    { label: "XX-Large", value: "XXL" },
    { label: "3X-Large", value: "3XL" },
    { label: "4X-Large", value: "4XL" },
  ];

  const visibleTypes = useMemo(() => {
    return [
      ...new Set(
        products.map(p => p.type)
      )
    ];
  }, [products]);

  return (
    <div
      className="d-flex flex-column p-3 rounded-4 "
      style={{ border: "1px solid #e5e7eb" }}
    >
      <div className="d-flex align-items-center justify-content-between pt-2 mb-4">
        <h4 className='fw-bold'>Filters</h4>
        {onClose ? (
            <IconButton onClick={onClose} size="small">
                <CloseIcon />
            </IconButton>
        ) : (
            <img
            className="icons"
            src="/icons/filter-icon.svg"
            alt="filter-icon"
            style={{ filter: 'brightness(0) saturate(100%) invert(65%)' }}
            />
        )}
      </div>
      <hr className="my-1 text-secondary" />
      {/* Category List */}
      <div className='my-4'>
        <h4 className='fw-bold'>Categories</h4>
        {categories.map((cat) => (
          <div key={cat.id}>
            <div
              className={`d-flex align-items-center justify-content-between py-2 filter-row
          ${categoryId === cat.id ? "fw-semibold text-primary" : ""}`}
              onClick={() => navigate(`/category/${cat.id}`)}
              style={{ cursor: "pointer" }}
            >
              <span>{cat.name}</span>
              <i className="bi bi-chevron-right text-muted"></i>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-1 text-secondary" />

      {/* type */}
      <div className='my-4'>
        <h4 className="fw-bold">Type</h4>
        {visibleTypes.map((type, index) => (
          <div key={index}>
            <div
              className={`d-flex align-items-center justify-content-between py-2 filter-row cursor-pointer
          ${draftFilters.type === type ? "fw-semibold text-primary" : "text-secondary"}`}
              onClick={() => dispatch(setDraftType(type === draftFilters.type ? '' : type))} // Toggle
            >
              <span>{type}</span>
              <i className="bi bi-chevron-right text-muted"></i>
            </div>
          </div>
        ))}
      </div>
      {/* Price */}
      <div className="price-slider w-100">
        <h4 className="fw-bold mb-2">Price</h4>

        <div className="d-flex flex-column justify-items-center align-items-center w-100">
          <div>
            <div className="slider-container">
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={draftFilters.price[0]}
                onChange={(e) =>
                  dispatch(
                    setDraftPrice([
                      Math.min(+e.target.value, draftFilters.price[1] - 10),
                      draftFilters.price[1],
                    ])
                  )
                }
                className="thumb thumb-left"
              />

              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={draftFilters.price[1]}
                onChange={(e) =>
                  dispatch(
                    setDraftPrice([
                      draftFilters.price[0],
                      Math.max(+e.target.value, draftFilters.price[0] + 10),
                    ])
                  )
                }
                className="thumb thumb-right"
              />

              <div className="slider-track" />
              <div
                className="slider-range"
                style={{
                  left: `${(draftFilters.price[0] / 500) * 100}%`,
                  right: `${100 - (draftFilters.price[1] / 500) * 100}%`,
                }}
              />
            </div>

            <div className="d-flex justify-content-between text-muted small mt-2">
              <span>₹{draftFilters.price[0]}</span>
              <span>₹{draftFilters.price[1]}</span>
            </div>
          </div>
        </div>
        <hr className="my-4 text-secondary" />
      </div>

      {/* Colors */}
      <div>
        <div className='my-3'>
          <h4 className='fw-bold'> Colors</h4>
        </div>
        <div className="d-flex flex-wrap gap-3 mb-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className={`color-circle ${draftFilters.colors.includes(c.name) ? "active" : ""
                }`}
              style={{
                backgroundColor: c.fill,
                borderColor: c.border,
              }}
              onClick={() => dispatch(toggleDraftColor(c.name))}
            >
              {draftFilters.colors.includes(c.name) && (
                <span className="checkmark">✓</span>
              )}
            </div>
          ))}
        </div>
        <hr className="my-4 text-secondary" />
      </div>
      {/* Sizes */}
      <div className="my-2">
        <h4 className='fw-bold'>Size</h4>
        <div className="d-flex flex-wrap gap-2">
          {ALL_SIZES.map(size => {
            const isSelected = draftFilters.sizes.includes(size.value);

            return (
              <button
                key={size.value}
                className={`btn btn-lg rounded-pill
                  ${isSelected ? "btn-dark" : "btn-light"}
                `}
                onClick={() => dispatch(toggleDraftSize(size.value))}
              >
                {size.label}
              </button>
            );
          })}
        </div>
        <hr className="my-4 text-secondary" />
      </div>


      <button
        className="btn btn-dark w-100 mt-3 rounded-5 py-3"
        onClick={() => {
          dispatch(applyFilters());
          if (onApply) onApply();
        }}
      >Apply Filters
      </button>
    </div>
  );
}
